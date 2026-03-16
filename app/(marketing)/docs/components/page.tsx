import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoundationsTab } from "@/components/docs/tab-foundations";
import { ControlsTab } from "@/components/docs/tab-controls";
import { FormsTab } from "@/components/docs/tab-forms";
import { NavigationTab } from "@/components/docs/tab-navigation";
import { OverlaysTab } from "@/components/docs/tab-overlays";
import { DataTab } from "@/components/docs/tab-data";

export const metadata = {
  title: "Komponen UI — KilatKoding",
  description: "Referensi lengkap semua komponen shadcn/ui yang tersedia.",
};

export default function ComponentsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Komponen UI</h1>
        <p className="mt-2 text-muted-foreground">
          43 komponen shadcn/ui siap pakai — klik tab untuk melihat demo interaktif.
        </p>
      </div>

      <Tabs defaultValue="foundations">
        <TabsList className="flex flex-wrap h-auto gap-1">
          <TabsTrigger value="foundations">Dasar</TabsTrigger>
          <TabsTrigger value="controls">Kontrol</TabsTrigger>
          <TabsTrigger value="forms">Form</TabsTrigger>
          <TabsTrigger value="navigation">Navigasi</TabsTrigger>
          <TabsTrigger value="overlays">Overlay</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="foundations">
            <FoundationsTab />
          </TabsContent>
          <TabsContent value="controls">
            <ControlsTab />
          </TabsContent>
          <TabsContent value="forms">
            <FormsTab />
          </TabsContent>
          <TabsContent value="navigation">
            <NavigationTab />
          </TabsContent>
          <TabsContent value="overlays">
            <OverlaysTab />
          </TabsContent>
          <TabsContent value="data">
            <DataTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
