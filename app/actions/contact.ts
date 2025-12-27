"use server";

import { z } from "zod";

const formSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
    _gotcha: z.string().optional(),
});

export async function sendEmail(values: z.infer<typeof formSchema>) {
    // 1. Validate fields on server
    const validatedFields = formSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, error: "Invalid fields" };
    }

    const { name, email, message, _gotcha } = validatedFields.data;

    // 2. Honeypot check
    if (_gotcha) {
        // Silently fail for bots
        return { success: true };
    }

    // 3. Mock Email Sending (Replace with Resend/SendGrid)
    try {
        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("--------------------------------");
        console.log("New Contact Form Submission:");
        console.log(`Name: ${name}`);
        console.log(`Email: ${email}`);
        console.log(`Message: ${message}`);
        console.log("--------------------------------");

        // TODO: Integrate Resend here
        // await resend.emails.send({ ... });

        return { success: true };
    } catch (error) {
        console.error("Email send failed:", error);
        return { success: false, error: "Failed to send email" };
    }
}
