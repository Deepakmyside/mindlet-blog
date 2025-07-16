import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useDispatch, useSelector } from 'react-redux';
import { login, setLoginModalOpen } from '../redux/slices/authSlice'; // 'loginUser' changed to 'login'
import { useToast } from "@/components/ui/use-toast";

const Login = ({ inModal = false }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { loading, error, isLoggedIn, hasCheckedAuth } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!inModal && hasCheckedAuth && isLoggedIn) {
      navigate('/');
    }
  }, [inModal, hasCheckedAuth, isLoggedIn, navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Input Error",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
      return;
    }
    if (!email.endsWith("@gmail.com")) {
      toast({
        title: "Invalid Email",
        description: "Email must be a Gmail address.",
        variant: "destructive",
      });
      return;
    }

    const resultAction = await dispatch(login({ email, password })); // 'loginUser' changed to 'login'

    if (login.fulfilled.match(resultAction)) { // 'loginUser.fulfilled' changed to 'login.fulfilled'
      toast({
        title: "Login Successful!",
        description: "Welcome back to Mindlet Blogs.",
      });
      if (inModal) {
        dispatch(setLoginModalOpen(false));
      }
    } else if (login.rejected.match(resultAction)) { // 'loginUser.rejected' changed to 'login.rejected'
      const errorMessage = resultAction.payload || error || "Login failed. Please check your credentials.";
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className={inModal ? "p-6 pt-0" : "min-h-screen flex items-center justify-center px-4 bg-[#fffdf6]"}>
      <Card className={inModal ? "w-full shadow-none border-none" : "w-full max-w-md p-6 space-y-4 bg-gray-50 shadow-lg rounded-xl"}>
        {!inModal && (
          <CardHeader className="flex justify-between items-center p-0">
            <h2 className="text-xl font-semibold">Login now</h2>
            <Link to="/signup" className="text-sm text-blue-500 hover:underline">
              Don’t have an account? Sign up
            </Link>
          </CardHeader>
        )}

        <CardContent className={inModal ? "space-y-4 p-0" : "space-y-4 p-0 pt-4"}>
          <form onSubmit={handleLogin} className="space-y-4" autoComplete="off">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-black text-white hover:bg-black/90" disabled={loading}>
              {loading ? 'Logging In...' : 'Login'}
            </Button>
          </form>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
