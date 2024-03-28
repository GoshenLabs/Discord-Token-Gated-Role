import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { discordServerId, contractAddress, roleId, roleId3, roleId5, roleId10, roleId20, roleId30, roleId50, roleId100 } from "../../constants";
import { authOptions } from "./auth/[...nextauth]";
import { getUser } from "./thirdweb-auth/[...thirdweb]";

export default async function grantRole(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get data from thirdweb auth, fail request if not signed in
  const user = await getUser(req);

  if (!user) {
    return res.status(401).json({ error: "Wallet not authorized!" });
  }

  // Get the Next Auth session so we can use the user ID as part of the discord API request
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }

  // Initialise the SDK
  const sdk = new ThirdwebSDK("base");

  // Check if this user owns an NFT
  const contract = await sdk.getContract(contractAddress);

  // Get addresses' balance of token ID 0
  const balance = await contract.erc721.balanceOf(user?.address!);

  // @ts-ignore
  const { userId } = session;

  console.log(userId);

  if (balance.toNumber() > 0 && balance.toNumber() <= 3) {
    // If the user is verified and has an NFT, grant roleId
    const response = await assignRole(userId, roleId);

    // Return the appropriate response
    return response.ok
      ? res.status(200).json({ message: "Role updated" })
      : handleError(response, res);
  } else if (balance.toNumber() > 3 && balance.toNumber() <= 5) {
    // If the user has more than 2 NFTs and less than or equal to 5, grant roleId2
    const response = await assignRole(userId, roleId3);

    // Return the appropriate response
    return response.ok
      ? res.status(200).json({ message: "Role updated" })
      : handleError(response, res);
  } 
  else if (balance.toNumber() > 5 && balance.toNumber() <= 10) {
    // If the user has more than 2 NFTs and less than or equal to 5, grant roleId2
    const response = await assignRole(userId, roleId5);

    // Return the appropriate response
    return response.ok
      ? res.status(200).json({ message: "Role updated" })
      : handleError(response, res);
  }
  else if (balance.toNumber() > 10 && balance.toNumber() <= 20) {
    // If the user has more than 2 NFTs and less than or equal to 5, grant roleId2
    const response = await assignRole(userId, roleId10);

    // Return the appropriate response
    return response.ok
      ? res.status(200).json({ message: "Role updated" })
      : handleError(response, res);
  }
  else if (balance.toNumber() > 20 && balance.toNumber() <= 30) {
    // If the user has more than 2 NFTs and less than or equal to 5, grant roleId2
    const response = await assignRole(userId, roleId20);

    // Return the appropriate response
    return response.ok
      ? res.status(200).json({ message: "Role updated" })
      : handleError(response, res);
  }
  else if (balance.toNumber() > 30 && balance.toNumber() <= 50) {
    // If the user has more than 2 NFTs and less than or equal to 5, grant roleId2
    const response = await assignRole(userId, roleId30);

    // Return the appropriate response
    return response.ok
      ? res.status(200).json({ message: "Role updated" })
      : handleError(response, res);
  }
  else if (balance.toNumber() > 50 && balance.toNumber() <= 100) {
    // If the user has more than 2 NFTs and less than or equal to 5, grant roleId2
    const response = await assignRole(userId, roleId50);

    // Return the appropriate response
    return response.ok
      ? res.status(200).json({ message: "Role updated" })
      : handleError(response, res);
  }
  else if (balance.toNumber() > 100) {
    // If the user has more than 2 NFTs and less than or equal to 5, grant roleId2
    const response = await assignRole(userId, roleId100);

    // Return the appropriate response
    return response.ok
      ? res.status(200).json({ message: "Role updated" })
      : handleError(response, res);
  }
  else {
    // If the user is verified but doesn't have the required NFTs, return an error
    return res
      .status(401)
      .json({ error: "User does not have the required HUNKS in their wallet." });
  }
}

async function assignRole(userId: string, roleIdToAssign: string) {
  // Get user's current roles
  const response = await fetch(
    `https://discordapp.com/api/guilds/${discordServerId}/members/${userId}`,
    {
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    return response; // Return response directly if not successful
  }
  const userData = await response.json();
  let currentRoles = userData.roles;

  // Remove all existing roles
  currentRoles = currentRoles.filter((roleIdToAssign: string) => ![ roleId, roleId3, roleId5, roleId10, roleId20, roleId30, roleId50, roleId100].includes(roleIdToAssign));

  // Add the new role
  currentRoles.push(roleIdToAssign);

  // Update the user's roles
  const updateResponse = await fetch(
    `https://discordapp.com/api/guilds/${discordServerId}/members/${userId}`,
    {
      headers: {
        Authorization: `Bot ${process.env.BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      method: "PATCH",
      body: JSON.stringify({ roles: currentRoles }),
    }
  );
  return updateResponse;
}

async function handleError(response: Response, res: NextApiResponse) {
  const resp = await response.json();
  console.error(resp);
  return res
    .status(500)
    .json({ error: "Error granting role, are you in the server?" });
}
