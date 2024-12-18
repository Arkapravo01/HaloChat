import { connectToDB } from "@mongodb";
import User from "@models/User";

export const POST = async (req, { params }) => {
  try {
    // Connect to the database
    await connectToDB();

    // Destructure userId and body from request
    const { userId } = params;
    const body = await req.json();
    const { username, profileImage } = body;

    // Ensure that userId is provided
    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    // Ensure that at least one field is being updated
    if (!username && !profileImage) {
      return new Response("No fields to update", { status: 400 });
    }

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, profileImage },
      { new: true }
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }

    // Return updated user details as response
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Failed to update user", { status: 500 });
  }
};
