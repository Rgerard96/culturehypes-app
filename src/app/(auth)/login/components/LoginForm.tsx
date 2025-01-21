"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginForm({ onSuccess }: { onSuccess: (email: string) => void; }) {

    const [loading, setLoading] = useState(false);

    const formSchema = z.object({
        email: z.string().email(),
    });

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        },
    });



    async function handleSignin(values: z.infer<typeof formSchema>) {
        setLoading(true);
        const res = await signIn('email', {
            email: values.email,
            redirect: false,
            callbackUrl: '/'
        });

        setLoading(false);
        if (res?.error) {
            if (res.url) {
                window.location.replace(res.url);
            }

        } else {
            onSuccess(values.email);
        }
    }


    return (
        <Card className='max-w-md w-full'>
            <CardHeader className='border-b items-center mb-5'>
                <CardTitle className='text-2xl'>Welkom bij CultureHypes</CardTitle>
                <CardDescription>Vul je email in om een account aan te maken of in te loggen</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSignin)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input placeholder="E-mail" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={loading} className='w-full' size='lg'>Doorgaan</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
