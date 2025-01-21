"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function VerifyForm({ email }: { email: string; }) {

    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        code: z.string()
    });

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: ""
        },
    });



    async function handleVerification(values: z.infer<typeof formSchema>) {
        setLoading(true);
        window.location.href = `/api/auth/callback/email?&token=${values.code}&email=${encodeURIComponent(
            email
        )}`;
        setLoading(false);
    }


    return (
        <Card className='max-w-md w-full'>
            <CardHeader className='border-b items-center mb-5'>
                <CardTitle className='text-2xl'>Verificatie code gestuurd!</CardTitle>
                <CardDescription>Vul de verificatie code in</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleVerification)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem className='flex flex-col items-center'>
                                    <FormLabel>Verificatie code</FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} className='w-full' size='lg'>Inloggen</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
