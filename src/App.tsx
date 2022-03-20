import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import DisclaimerPage from './pages/DisclaimerPage';
import HistoryDayPage from './pages/HistoryDayPage';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/history" element={<HistoryDayPage />}></Route>
              <Route path="/disclaimer" element={<DisclaimerPage />}></Route>
            </Routes>
          </Layout>
        </LocalizationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
