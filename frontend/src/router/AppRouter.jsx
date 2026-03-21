import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import HomePage from "../pages/common/HomePage";
import DocsPage from "../pages/common/DocsPage";
import RolesPage from "../pages/common/RolesPage";
import LodgingListPage from "../pages/user/LodgingListPage";
import LodgingDetailPage from "../pages/user/LodgingDetailPage";
import BookingPage from "../pages/user/BookingPage";
import MyBookingsPage from "../pages/user/MyBookingsPage";
import MyInquiriesPage from "../pages/user/MyInquiriesPage";
import SellerDashboardPage from "../pages/seller/SellerDashboardPage";
import SellerLodgingsPage from "../pages/seller/SellerLodgingsPage";
import SellerReservationsPage from "../pages/seller/SellerReservationsPage";
import SellerInquiriesPage from "../pages/seller/SellerInquiriesPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminSellersPage from "../pages/admin/AdminSellersPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/lodgings" element={<LodgingListPage />} />
          <Route path="/lodgings/:lodgingId" element={<LodgingDetailPage />} />
          <Route path="/booking/:lodgingId" element={<BookingPage />} />
          <Route path="/my/bookings" element={<MyBookingsPage />} />
          <Route path="/my/inquiries" element={<MyInquiriesPage />} />
          <Route path="/seller" element={<SellerDashboardPage />} />
          <Route path="/seller/lodgings" element={<SellerLodgingsPage />} />
          <Route path="/seller/reservations" element={<SellerReservationsPage />} />
          <Route path="/seller/inquiries" element={<SellerInquiriesPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/sellers" element={<AdminSellersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
