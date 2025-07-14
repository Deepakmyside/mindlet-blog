import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardHeader, CardContent, Button, Input, Label } from "@/components/ui";

import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // 🔐 Store token safely

      console.log("Login successful!");
      navigate("/admin"); // ✅ Redirect to Admin dashboard
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      // Optionally show toast here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#fffdf6]">
      <Card className="w-full max-w-md p-6 space-y-4 bg-gray-50 shadow-lg rounded-xl">
        <CardHeader className="flex justify-between items-center p-0">
          <h2 className="text-xl font-semibold">Login now</h2>
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">
            Don’t have an account? Sign up
          </Link>
        </CardHeader>

        <CardContent className="space-y-4 p-0 pt-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full bg-black text-white hover:bg-black/90">
              Login
            </Button>
          </form>

          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <FcGoogle size={20} />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

