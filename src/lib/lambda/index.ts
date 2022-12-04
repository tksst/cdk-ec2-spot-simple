// eslint-disable-next-line import/no-extraneous-dependencies
import { CancelSpotInstanceRequestsCommand, DescribeInstancesCommand, EC2Client } from "@aws-sdk/client-ec2";
import type { CdkCustomResourceEvent, CdkCustomResourceResponse } from "aws-lambda";

export const handler = async (event: CdkCustomResourceEvent): Promise<CdkCustomResourceResponse> => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);

    const instanceId = event.ResourceProperties.ec2InstanceId as string;

    switch (event.RequestType) {
        case "Create":
            break;
        case "Delete":
            await deleteSpotReq(instanceId);
            break;
        case "Update":
            await deleteSpotReq(event.OldResourceProperties.ec2InstanceId as string);
            break;
    }

    return { PhysicalResourceId: `customresource-for-${instanceId}` };
};

async function getSpotReqId(client: EC2Client, instanceId: string): Promise<string | undefined> {
    const command = new DescribeInstancesCommand({
        InstanceIds: [instanceId],
    });

    const result = await client.send(command);
    return result.Reservations?.[0]?.Instances?.[0]?.SpotInstanceRequestId;
}

async function cancel(client: EC2Client, spotReqId: string): Promise<boolean> {
    const command = new CancelSpotInstanceRequestsCommand({
        SpotInstanceRequestIds: [spotReqId],
    });

    const result = await client.send(command);

    return result.CancelledSpotInstanceRequests?.[0]?.SpotInstanceRequestId === spotReqId;
}

async function deleteSpotReq(instanceId: string) {
    const client = new EC2Client({});

    try {
        const spotReqId = await getSpotReqId(client, instanceId);

        if (spotReqId === undefined) {
            console.log(`${instanceId} not found or it has no SpotInstanceRequest`);
            return;
        }

        const succeeded = await cancel(client, spotReqId);

        if (!succeeded) {
            console.log(`seems to have failed to cancel the SpotInstanceRequest ${spotReqId}`);
        }
    } finally {
        client.destroy();
    }
}
