import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routTree.gen";
import { useRouter } from "@tanstack/react-router";

function DefaultErrorComponent({ error, reset }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">

        <h1 className="text-2xl font-bold text-foreground">
          Something went wrong
        </h1>

        {import.meta.env.DEV && error?.message && (
          <pre className="mt-4 bg-muted p-2 text-xs">
            {error.message}
          </pre>
        )}

        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

// ✅ SINGLETON router (IMPORTANT)
export const router = createRouter({
  routeTree,
  context: {},
  defaultPreloadStaleTime: 0,
  defaultErrorComponent: DefaultErrorComponent,
});