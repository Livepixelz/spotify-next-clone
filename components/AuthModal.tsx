"use client";

import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useAuthModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const appearance = {
    theme: ThemeSupa,
    variables: {
      default: { colors: { brand: "#404040", brandAccent: "#22c55e" } },
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title="Welcome back"
      description="Login to your account"
    >
      <Auth
        theme="dark"
        magicLink={true}
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={appearance}
      />
    </Modal>
  );
};

export default AuthModal;
