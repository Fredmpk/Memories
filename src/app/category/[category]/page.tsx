import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Category({ params }: { params: { category: string } }) {
  const { category } = params;
  return (
    <div>
      <p className="pb-5">this is the section</p>
      <div className="grid w-full gap-1.5 p-2">
        <Label htmlFor="message">Die Erinnerung</Label>
        <Textarea placeholder="Schreibe deine Erinnerung hier" id="message" />
      </div>
    </div>
  );
}
