"use server";

// Real server action that runs on the server
export async function submitFeedbackAction(prevState: any, formData: FormData) {
  const feedback = formData.get("feedback") as string;
  const rating = formData.get("rating") as string;
  
  // This code runs on the SERVER
  console.log("Server: Processing feedback...", { feedback, rating });
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // You could save to database here:
  // await db.feedback.create({ data: { feedback, rating } });
  
  // Simulate random failure for demonstration
  if (Math.random() < 0.3) {
    return {
      success: false,
      message: "Failed to submit feedback. Please try again.",
      data: null
    };
  }
  
  return {
    success: true,
    message: `Thank you for your ${rating} rating and feedback: "${feedback}"`,
    data: { feedback, rating, submittedAt: new Date().toISOString() }
  };
}

export async function addTodoAction(text: string) {
  "use server";
  
  // This runs on the server
  console.log("Server: Adding todo...", text);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // You could save to database here:
  // const todo = await db.todos.create({ data: { text } });
  
  return { id: Date.now(), text, completed: false };
}
