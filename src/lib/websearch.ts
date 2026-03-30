export async function getWebResults(query: string) {
  try {
    const res = await fetch("https://google.serper.dev/search", {
      method: "POST",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: query }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch web results");
    }

    const data = await res.json();

    return data.organic?.slice(0, 5).map((r: any) => ({
      title: r.title,
      snippet: r.snippet,
      link: r.link,
    })) || [];

  } catch (error) {
    console.error("Web search error:", error);
    return [];
  }
}