//HILA THIS IS JUST FOR NOW I DONT KNOW WHERE TO PUT IT

async function getAllImages() {
    const images = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
  
      // Check if the key starts with "final-drawing-"
      if (key.startsWith("final-drawing-")) {
        images.push({
          id: key, // Use the full key as the ID
          imageBase64: localStorage.getItem(key), // Get the Base64 image data
        });
      }
    }
  
    /*
    // Future Implementation: Fetch images via API Gateway with Cognito Authentication
    const apiEndpoint = "https://your-api-gateway-endpoint.amazonaws.com/prod/images";
  
    // Retrieve Cognito user token (replace with actual method to get the token)
    const userToken = localStorage.getItem("cognitoUserToken"); // Example: stored during login
  
    if (!userToken) {
      alert("User not authenticated. Please log in.");
      return [];
    }
  
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${userToken}`, // Pass Cognito user token in the Authorization header
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch images.");
      }
  
      const data = await response.json();
      return data.images; // Assuming the API returns an object with an "images" array
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("An error occurred while fetching the images.");
      return [];
    }
    */
  
    return images;
  }
  