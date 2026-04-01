import { useEffect, useRef } from "react";
import { loadGoogleScript, loginWithGoogleIdToken } from "../../features/auth/authViewModels";

export default function GoogleSignInButton({ text = "continue_with", onSuccess, onError }) {
  const buttonRef = useRef(null);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";

  useEffect(() => {
    let disposed = false;

    async function render() {
      try {
        const google = await loadGoogleScript();
        if (disposed || !buttonRef.current) {
          return;
        }

        google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response) => {
            try {
              const session = await loginWithGoogleIdToken(response.credential);
              onSuccess?.(session);
            } catch (error) {
              onError?.(error);
            }
          },
          ux_mode: "popup",
          use_fedcm_for_button: false,
          use_fedcm_for_prompt: false,
        });

        buttonRef.current.innerHTML = "";
        google.accounts.id.renderButton(buttonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text,
          shape: "rectangular",
          width: 360,
          logo_alignment: "left",
        });
      } catch (error) {
        if (!disposed) {
          onError?.(error);
        }
      }
    }

    render();

    return () => {
      disposed = true;
    };
  }, [googleClientId, onError, onSuccess, text]);

  return <div className="google-signin-slot" ref={buttonRef} />;
}
