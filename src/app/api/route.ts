import { NextRequest, NextResponse } from "next/server";
import puppeteerCore from "puppeteer-core";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";

// class MyClass {
//   #privateField = 42;

//   #privateMethod() {
//     console.log("This is a private method");
//   }

//   publicMethod() {
//     console.log("This is a public method");
//     console.log("Private field value:", this.#privateField);
//     this.#privateMethod();
//   }
// }

// const instance = new MyClass();
// instance.publicMethod();
// // Output:
// // This is a public method
// // Private field value: 42
// // This is a private method

// console.log(instance.#privateField); // Error: Private field '#privateField' must be declared in an enclosing class
// instance.#privateMethod(); // Error: Private method '#privateMethod' must be declared in an enclosing class

export async function GET(request: NextRequest) {
  const executablePath = await chromium.executablePath();

  const browser = await puppeteer.launch(
    process.env.VERCEL_ENV === "production"
      ? {
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath,
          headless: chromium.headless,
        }
      : undefined
  );
  const page = await browser.newPage();
  await page.goto("https://example.com");
  const pdf = await page.pdf();
  await browser.close();
  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      // "Content-Disposition": "attachment; filename=example.pdf",
    },
  });

  // return new NextResponse("Hello, world!");
}
