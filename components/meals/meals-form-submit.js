"use client";

import { useFormStatus } from "react-dom";

export default function MealsFormSubmit({ action, children }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit">{pending ? "Submitting ..." : "Share a meal"}</button>
  );
}
