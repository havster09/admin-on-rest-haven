import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const Dashboard = () => {
    return (
        <Card style={{ margin: '2em' }}>
            <CardHeader title="Welcome to the administration" />
            <CardText>Lorem ipsum sic dolor amet...</CardText>
        </Card>
    );
};

Dashboard.propTypes = {};

export default Dashboard;
