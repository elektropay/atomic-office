import { Card, Container, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import {
    SimpleForm,
    useDataProvider,
    useNotify,
    useRedirect,
} from 'react-admin';
import { SubmitHandler } from 'react-hook-form';
import { CrmDataProvider } from '../providers/types';
import { SalesFormData } from '../types';
import { SalesInputs } from './SalesInputs';

export function SalesCreate() {
    const dataProvider = useDataProvider<CrmDataProvider>();
    const notify = useNotify();
    const redirect = useRedirect();

    const { mutate } = useMutation({
        mutationKey: ['signup'],
        mutationFn: async (data: SalesFormData) => {
            return dataProvider.salesCreate(data);
        },
        onSuccess: () => {
            redirect('/sales');
        },
        onError: () => {
            notify('An error occurred. Please try again.');
        },
    });
    const onSubmit: SubmitHandler<SalesFormData> = async data => {
        mutate(data);
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card>
                <SimpleForm onSubmit={onSubmit as SubmitHandler<any>}>
                    <Typography variant="h6">Create sale person</Typography>
                    <SalesInputs />
                </SimpleForm>
            </Card>
        </Container>
    );
}
