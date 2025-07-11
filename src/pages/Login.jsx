import React from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../components/Navbar";

const Login = () => {
  // 🔹 State for controlled inputs
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#fffdf6]">
      <Card className="w-full max-w-md p-6 space-y-4 bg-gray-50 shadow-lg rounded-xl">
        {/* Header */}
        <CardHeader className="flex justify-between items-center p-0">
          <h2 className="text-xl font-semibold">Login now</h2>
          <Link to="/signup" className="text-sm text-blue-500 hover:underline">
             Don’t have an account? Sign up
          </Link>
        </CardHeader>

        {/* Form Content */}
        <CardContent className="space-y-4 p-0 pt-4">
          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {/* Signup Button */}
          <Button className="w-full bg-black text-white hover:bg-black/90">
            Login
          </Button>

          {/* Google Signup */}
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
    
