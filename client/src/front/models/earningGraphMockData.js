// @flow

export const earningGraphMockData = {
  labels: [
    'Cluster 1',
    'Cluster 2',
    'Cluster 3',
    'Cluster 4',
    'Cluster 5',
    'Cluster 6',
  ],
  datasets: [
    {
      label: 'Nodes per cluster',
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: [4, 6, 3, 5, 2, 3],
    },
    {
      label: 'Sensors per Cluster',
      fillColor: 'rgba(151,187,205,0.2)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,1)',
      data: [16, 12, 18, 22, 8, 12],
    },
  ],
};
