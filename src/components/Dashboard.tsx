import React from 'react';
import { useSession } from 'next-auth/react';
import { AlertCircle, CheckCircle, Clock, Users, FileText } from 'lucide-react';
import Layout from './Layout';
import { Card, Metric, Text, Flex, Grid, BarList, DonutChart, Title } from '@tremor/react';
import theme from '@/styles/theme';

const Dashboard: React.FC = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Access denied. Please log in.</div>;
  }

  // Mock data for demonstration
  const stats = [
    { name: 'Total Cases', value: '150', icon: FileText, color: theme.colors.primary },
    { name: 'Open Cases', value: '45', icon: AlertCircle, color: theme.colors.warning },
    { name: 'In Progress', value: '30', icon: Clock, color: theme.colors.accent },
    { name: 'Closed Cases', value: '75', icon: CheckCircle, color: theme.colors.success },
    { name: 'Total Users', value: '25', icon: Users, color: theme.colors.secondary },
  ];

  const casesByType = [
    { name: 'Hardware', value: 35 },
    { name: 'Software', value: 40 },
    { name: 'Network', value: 25 },
    { name: 'Security', value: 20 },
    { name: 'Other', value: 30 },
  ];

  const caseStatusData = [
    { name: 'Open', value: 45 },
    { name: 'In Progress', value: 30 },
    { name: 'Closed', value: 75 },
  ];

  return (
    <Layout>
      <main className="p-4 md:p-10 mx-auto max-w-7xl">
        <h1 className="text-2xl font-semibold mb-4" style={{ color: theme.colors.text }}>Dashboard</h1>
        <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
          {stats.map((item) => (
            <Card key={item.name} decoration="top" decorationColor={item.color}>
              <Flex justifyContent="start" className="space-x-4">
                <item.icon className="w-8 h-8" style={{ color: item.color }} />
                <div className="truncate">
                  <Text>{item.name}</Text>
                  <Metric className="truncate">{item.value}</Metric>
                </div>
              </Flex>
            </Card>
          ))}
        </Grid>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <Title>Cases by Type</Title>
            <BarList data={casesByType} className="mt-4" color={theme.colors.primary} />
          </Card>
          <Card>
            <Title>Case Status Overview</Title>
            <DonutChart
              data={caseStatusData}
              category="value"
              index="name"
              valueFormatter={(number: number) => number.toString()}
              colors={[theme.colors.warning, theme.colors.accent, theme.colors.success]}
              className="mt-6"
            />
          </Card>
        </div>
      </main>
    </Layout>
  );
};

export default Dashboard;