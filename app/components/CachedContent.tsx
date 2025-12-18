import { getPrivatePersonalizedData } from "../lib/cache";
import { cookies, headers } from "next/headers";
import Link from "next/link";

export async function CachedContent({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ v?: string }>;
}) {
  const searchParams = await searchParamsPromise;
  const cookieStore = await cookies();
  const headersList = await headers();

  const demoUser = cookieStore.get("demoUser")?.value || "not set";
  const userAgent = headersList.get("user-agent") || "unknown";
  const currentVersion = searchParams.v || "default";

  // Call the cached function with runtime values as parameters
  const cachedData = await getPrivatePersonalizedData(
    searchParams,
    demoUser,
    userAgent
  );

  // Generate next version number for testing
  const nextVersion = searchParams.v
    ? String(parseInt(searchParams.v) + 1)
    : "1";

  return (
    <>
      {/* Runtime Values */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          📊 Current Runtime Values
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-slate-400">Cookie (demoUser):</span>
            <span className="text-purple-300 font-mono font-semibold">
              {demoUser}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-slate-400">User-Agent:</span>
            <span className="text-purple-300 font-mono text-sm truncate max-w-md">
              {userAgent.substring(0, 60)}...
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">SearchParam (v):</span>
            <span className="text-purple-300 font-mono font-semibold">
              {currentVersion}
            </span>
          </div>
        </div>
      </div>

      {/* Cached Data Display */}
      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          ⚡ Cached Data (use cache: private)
        </h2>
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <pre className="text-green-300 text-sm overflow-x-auto">
            {JSON.stringify(cachedData, null, 2)}
          </pre>
        </div>
        <div className="text-sm text-slate-300 space-y-1">
          <p>
            <strong className="text-purple-300">Cache Life:</strong> Stale: 60s,
            Revalidate: 120s, Expire: 180s
          </p>
          <p>
            <strong className="text-purple-300">Execution ID:</strong>{" "}
            <code className="bg-black/40 px-2 py-1 rounded">
              {cachedData.executionId}
            </code>
          </p>
          <p className="text-xs text-slate-400 mt-2">
            💡 If you refresh this page within 60s, you'll see the SAME
            executionId (cached). Check your server logs to confirm!
          </p>
        </div>
      </div>

      {/* Testing Controls */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">
          🧪 Test Cache Behavior
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-slate-300 mb-3">
              Change the{" "}
              <code className="bg-purple-500/20 px-2 py-1 rounded">?v=</code>{" "}
              parameter to test cache variations:
            </p>
            <Link
              href={`/?v=${nextVersion}`}
              className="block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition text-center font-semibold"
            >
              Navigate to ?v={nextVersion}
            </Link>
          </div>
          <div className="text-sm text-slate-400 space-y-1">
            <p>
              • Refresh the page → Should see cached data (same executionId)
            </p>
            <p>• Click the button → New cache entry for different ?v= value</p>
            <p>• Change cookie → New cache entry for different user</p>
            <p>• Wait 60+ seconds → Cache revalidation occurs</p>
          </div>
        </div>
      </div>
    </>
  );
}
