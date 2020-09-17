import React from 'react';
import { Grid, CardContent, Typography, Card, CardHeader } from '@material-ui/core';

interface IProps {
    title: string;
    currentValue: string
}

export default ({ title, currentValue }: IProps) => 
    <Grid item md={5} xs={6}>
        <Card elevation={2}>
            <CardHeader title={title} />
            <CardContent>
                <Typography variant="h3">
                    {currentValue}
                </Typography>
            </CardContent>
        </Card>
    </Grid>