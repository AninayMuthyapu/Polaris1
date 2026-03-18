import { inngest } from "./client"; // or path to client
import {google} from '@ai-sdk/google'
import {generateText} from 'ai'
export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },                // 1. Config Object
  { event: "demo/generate" },        // 2. Trigger
  async ({  step }) => {          
    await step.run("generate-text",async()=> {
        return await generateText({
            model: google('gemini-2.5-flash'),
            prompt:"write a vegetarian lasagna recipe for 4 people",
        })
    });
    
  },
);
