"use client";
import { useMemo, useState } from "react";
import { debounce } from "@/utils/debounce";
import { Tool } from "@/entities/tool";
import { useAppData } from "@/hooks/useAppData";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import "@/styles/pages/home.css";

type MenuIconProps = {
  items: Tool[];
};

function MenuIcon({ items }: MenuIconProps) {
  const router = useRouter();
  return (
    <div className="card-group">
      {items.map((t) => {
        return (
          <Card
            key={t.id}
            title={t.name}
            subtitle={t.group}
            iconType={t.iconType ?? "class"}
            icon={t.icon ?? "apps"}
            onClick={() => router.push(`/tools/${t.id}`)}
          >
            <span>{t.shortDescription}</span>
          </Card>
        );
      })}
    </div>
  );
}

export default function HomePage() {
  const allTools = useAppData().tools;
  const [tools, setTools] = useState<Tool[]>(() => allTools);

  const handleSearch = (value: string) => {
    const filtered = allTools.filter((t) =>
      t.name.toLowerCase().includes(value.toLowerCase())
    );
    setTools(filtered);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 50), [allTools]);

  return (
    <div>
      <div className="heading">
        <h1>Honey Tools</h1>
        <h3>All tools in one place</h3>
      </div>

      <div className="search-box">
        <input
          onChange={(e) => debouncedSearch(e.target.value)}
          type="text"
          placeholder="Search tool here..."
        />
        <button className="material-symbols-outlined">search</button>
      </div>

      <MenuIcon items={tools} />
    </div>
  );
}
