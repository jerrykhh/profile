import { CmsEditor } from "@/components/cms/editor";
import { readCmsDesk } from "@/lib/private/cms-desk";

export const dynamic = "force-dynamic";

export default async function CmsPage() {
  const desk = await readCmsDesk();
  return <CmsEditor desk={desk} />;
}
