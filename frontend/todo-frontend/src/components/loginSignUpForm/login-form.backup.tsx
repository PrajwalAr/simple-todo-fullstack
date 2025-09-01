import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useState } from 'react';
import { validateForm } from './loginSignup.helper';
import { signup, login } from '@/apis/loginSignup.api';
import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const profileFormSchema = validateForm(isLogin);

  type ProfileFormValues = z.infer<typeof profileFormSchema>;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...(isLogin
        ? {}
        : {
            username: '',
          }),
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control } = form;

  function onSubmit(data: ProfileFormValues) {
    if (isLogin) {
      login(data).then((res) => {
        if (res.token) {
          authLogin(res.token);
          form.reset();
          navigate('/home');
        } else {
          form.setError('email', {
            type: 'custom',
            message: 'Invalid Credentials',
          });
        }
      });
    } else {
      /* @ts-expect-error: Todo: Fix this */
      signup(data);
      form.reset();
      setIsLogin(true);
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>
              {isLogin ? 'Login to your account' : 'Sign up'}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? 'Enter your email below to login to your account'
                : 'Enter your details below to sign up'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  {!isLogin ? (
                    <div className="grid gap-3">
                      <FormField
                        control={control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              {/* @ts-expect-error: Todo: Fix this */}
                              <Input placeholder="johndoe" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : null}
                  <div className="grid gap-3">
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3">
                    <FormField
                      control={control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </div>
                </div>
                {isLogin ? (
                  <div className="mt-4 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <a
                      className="underline underline-offset-4 cursor-pointer"
                      onClick={() => setIsLogin(false)}
                    >
                      Sign up
                    </a>
                  </div>
                ) : (
                  <div className="mt-4 text-center text-sm">
                    Do you already have an account?{' '}
                    <a
                      className="underline underline-offset-4 cursor-pointer"
                      onClick={() => setIsLogin(true)}
                    >
                      Log in
                    </a>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
