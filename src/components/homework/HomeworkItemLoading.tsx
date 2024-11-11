import React from 'react';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid2';

function HomeworkItemLoading() {
    return (
        <Grid container columns={2}>
            <Grid size="grow">
                <Stack direction="column">
                    <Skeleton width={100} variant="text" sx={{ fontSize: '1.5rem', mb: "10px" }} />
                    <Skeleton width={200} variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton width={300} variant="text" sx={{ fontSize: '1rem' }} />
                </Stack>
            </Grid>
            <Grid alignSelf={"center"}>
                <Skeleton variant="rounded" width={80} height={32} />
            </Grid>
        </Grid>
    );
}

export default HomeworkItemLoading;