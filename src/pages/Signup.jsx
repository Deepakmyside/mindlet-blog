import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { signup, setLoginModalOpen } from "../redux/slices/authSlice";
import { useToast } from "@//hooks/use-toast";

const Signup = ({ inModal = false }) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { loading, error, isLoggedIn, hasCheckedAuth } = useSelector(
    (state) => state.auth
  );

  React.useEffect(() => {
    if (!inModal && hasCheckedAuth && isLoggedIn) {
      navigate("/");
    }
  }, [inModal, hasCheckedAuth, isLoggedIn, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: "Input Error",
        description: "Please fill in all fields.",
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

    const resultAction = await dispatch(signup({ name, email, password }));

    if (signup.fulfilled.match(resultAction)) {
      toast({
        title: "Signup Successful!",
        description: "Welcome to the platform!",
      });
      if (inModal) {
        dispatch(setLoginModalOpen(false));
      }
    } else if (signup.rejected.match(resultAction)) {
      const errorMessage =
        resultAction.payload || error || "Signup failed. Please try again.";
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={
        inModal
          ? "p-6 pt-0"
          : "min-h-screen flex items-center justify-center px-4 bg-[#fffdf6]"
      }
    >
      <Card
        className={
          inModal
            ? "w-full shadow-none border-none"
            : "w-full max-w-md p-6 space-y-4 bg-gray-50 shadow-lg rounded-xl"
        }
      >
        {!inModal && (
          <CardHeader className="flex justify-between items-center p-0">
            <h2 className="text-xl font-semibold">Create your account</h2>
            <Link
              to="/login"
              className="text-sm text-blue-500 hover:underline"
            >
              Login into existing account
            </Link>
          </CardHeader>
        )}

        <CardContent className={inModal ? "space-y-4 p-0" : "space-y-4 p-0 pt-4"}>
          <form onSubmit={handleSignup} className="space-y-4" autoComplete="off">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-black/90"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Signup"}
            </Button>
          </form>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
