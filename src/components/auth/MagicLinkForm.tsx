
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Mail } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

const MagicLinkForm: React.FC = () => {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await login(data.email);
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending magic link:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="text-center p-6 bg-white rounded-lg shadow-sm">
        <div className="mx-auto w-12 h-12 bg-kleen-mint/10 flex items-center justify-center rounded-full mb-4">
          <Mail className="h-6 w-6 text-kleen-mint" />
        </div>
        <h3 className="text-xl font-medium mb-2">Check your inbox</h3>
        <p className="text-kleen-gray/70 mb-4">
          We've sent a magic link to <span className="font-medium">{form.getValues().email}</span>
        </p>
        <p className="text-sm text-kleen-gray/60">
          Click the link in the email to sign in to your Kleen account.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-kleen-mint hover:bg-kleen-mint/90" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Magic Link'}
        </Button>
      </form>
    </Form>
  );
};

export default MagicLinkForm;
