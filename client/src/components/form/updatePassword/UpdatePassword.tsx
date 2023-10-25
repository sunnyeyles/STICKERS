import { Divider, Grid, Stack, Text } from "@mantine/core";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextInput } from "../custom_input_fields/textInput/TextInput";

const updatePasswordSchema = z
    .object({
        userName: z.string().min(2, { message: 'User Name is required' }),
        email: z
            .string()
            .email('Invalid email')
            .min(1, { message: 'Email is required' }),
        currentPassword: z
            .string()
            .min(1, { message: 'Password is required' })
            .min(8, { message: 'Password must have more than 8 characters' }),
        newPassword: z.string().min(1, { message: 'Password is required' }),
    })
    .refine((data) => data.currentPassword === data.newPassword, {
        message: "Passwords don't match",
        path: ['newPassword'], //path of error
    })

type FormSchemaType = z.infer<typeof updatePasswordSchema>

export function UpdatePassword() {

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<FormSchemaType>({
        defaultValues: {
            userName: '',
            email: '',
            currentPassword: '',
            newPassword: ''
        },
        resolver: zodResolver(updatePasswordSchema),
    })


    const onSubmit = async (values: any) => {

    };

    return (
        <>
            <form>
                <Grid justify="space-around" align="center">
                    <Grid.Col sm={6}>
                        <Text size="md">Username and Email can´t be changed</Text>
                    </Grid.Col>
                    <Grid.Col sm={6}>
                        <Stack>
                            <TextInput
                                control={control}
                                placeholder="Username"
                                size="md"
                                radius="md"
                                id="userName"
                                name="userName"
                                disabled={true}
                            />
                            <TextInput
                                control={control}
                                placeholder="Email"
                                size="md"
                                radius="md"
                                id="email"
                                name="email"
                                disabled={true}
                            />
                        </Stack>
                    </Grid.Col>
                </Grid>
                <Divider my="sm" />
                <Grid justify="space-around" align="center">
                    <Grid.Col sm={6}>
                        <Text size="md">Update Password<br />Enter both fileds to change your password</Text>
                    </Grid.Col>
                    <Grid.Col sm={6}>
                        <Stack>
                            <TextInput
                                control={control}
                                placeholder="Current Password"
                                size="md"
                                radius="md"
                                id="currentPassword"
                                name="currentPassword"
                            />
                            <TextInput
                                control={control}
                                placeholder="New Password"
                                size="md"
                                radius="md"
                                id="newPassword"
                                name="newPassword"
                            />
                        </Stack>
                    </Grid.Col>
                </Grid >
            </form>
        </>
    )
}

