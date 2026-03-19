import { inngest } from "./client"; // or path to client
import {google} from '@ai-sdk/google'
import {generateText} from 'ai'
import { firecrawl } from "@/firecrawl";


const URL_REGEX = /https?:\/\/[^\s]+/g;
export const demoGenerate = inngest.createFunction(
  { id: "demo-generate" },                // 1. Config Object
  { event: "demo/generate" },        // 2. Trigger
  async ({ event, step }) => {   
    
    const { prompt }=event.data as {prompt:string};
    const urls = await step.run("extract-urls", async () => {
      return prompt.match(URL_REGEX) || [];
    }) as string[];

    const scrappedContent=await step.run("scrape-urls",async()=>{
      const results = await Promise.all(
        urls.map(async(url)=>{
          const result=await firecrawl.scrape(
            url,
            {formats:["markdown"]},
          );
          return result.markdown??null;
        })
      )
      return results.filter(Boolean).join("\n\n")
    })
    const finalPrompt=scrappedContent?`context:\n${scrappedContent}\n\n Question:${prompt}`:prompt;


    await step.run("generate-text",async()=> {
        return await generateText({
            model: google('gemini-2.5-flash'),
            prompt: finalPrompt
        })
    });
    
  },
);
