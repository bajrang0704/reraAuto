import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import PersonalInfoPage from './pages/PersonalInfo/PersonalInfoPage';
import PastExperiencePage from './pages/PersonalInfo/PastExperiencePage';
import AddProjectPage from './pages/Project/AddProjectPage';
import AddBuildingsPage from './pages/Project/AddBuildingsPage';
import AddCoPromoterPage from './pages/Project/AddCoPromoterPage';
import CommonAreasPage from './pages/Project/CommonAreasPage';
import ProjectCostPage from './pages/Project/ProjectCostPage';
import ProfessionalDetailsPage from './pages/Project/ProfessionalDetailsPage';
import DocumentUploadPage from './pages/Project/DocumentUploadPage';
import LitigationsPage from './pages/Project/LitigationsPage';
import TaskActivityPage from './pages/Project/TaskActivityPage';
import UploadPhotosPage from './pages/Project/UploadPhotosPage';
import ApplicationWithdrawalPage from './pages/Project/ApplicationWithdrawalPage';
import ApplicationChangePage from './pages/Project/ApplicationChangePage';
import PaymentPage from './pages/Payment/PaymentPage';
import ProjectExtensionPage from './pages/ProjectExtension/ProjectExtensionPage';
import DownloadReceiptsPage from './pages/Payment/DownloadReceiptsPage';
import QuarterlyUpdatePage from './pages/ProjectUpdate/QuarterlyUpdatePage';
import AnnualAuditReportPage from './pages/ProjectUpdate/AnnualAuditReportPage';
import CompletionCertificatePage from './pages/ProjectUpdate/CompletionCertificatePage';

import ProjectStatusPage from './pages/Project/ProjectStatusPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/project/status" replace />} />
      <Route path="/project/status" element={<MainLayout><ProjectStatusPage /></MainLayout>} />

      <Route
        path="/personal-info"
        element={
          <MainLayout>
            <PersonalInfoPage />
          </MainLayout>
        }
      />
      <Route path="/past-experience" element={<MainLayout><PastExperiencePage /></MainLayout>} />

      {/* --- Project Details Routes --- */}
      <Route path="/project/add" element={<MainLayout><AddProjectPage /></MainLayout>} />
      <Route path="/project/co-promoter" element={<MainLayout><AddCoPromoterPage /></MainLayout>} />
      <Route path="/project/add-buildings" element={<MainLayout><AddBuildingsPage /></MainLayout>} />
      <Route path="/project/common-areas" element={<MainLayout><CommonAreasPage /></MainLayout>} />
      <Route path="/project/cost" element={<MainLayout><ProjectCostPage /></MainLayout>} />
      <Route path="/project/professional" element={<MainLayout><ProfessionalDetailsPage /></MainLayout>} />
      <Route path="/project/documents" element={<MainLayout><DocumentUploadPage /></MainLayout>} />
      <Route path="/project/litigations" element={<MainLayout><LitigationsPage /></MainLayout>} />
      <Route path="/project/activity" element={<MainLayout><TaskActivityPage /></MainLayout>} />
      <Route path="/project/photos" element={<MainLayout><UploadPhotosPage /></MainLayout>} />
      <Route path="/project/withdrawal" element={<MainLayout><ApplicationWithdrawalPage /></MainLayout>} />
      <Route path="/project/change" element={<MainLayout><ApplicationChangePage /></MainLayout>} />

      {/* --- Other Top Level Routes --- */}
      <Route path="/payment" element={<MainLayout><PaymentPage /></MainLayout>} />
      <Route path="/project/extension" element={<MainLayout><ProjectExtensionPage /></MainLayout>} />
      <Route path="/payment/receipts" element={<MainLayout><DownloadReceiptsPage /></MainLayout>} />
      <Route path="/update/quarterly" element={<MainLayout><QuarterlyUpdatePage /></MainLayout>} />
      <Route path="/update/audit" element={<MainLayout><AnnualAuditReportPage /></MainLayout>} />
      <Route path="/update/completion" element={<MainLayout><CompletionCertificatePage /></MainLayout>} />

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
