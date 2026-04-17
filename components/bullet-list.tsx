export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-2 my-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="text-primary mt-1 shrink-0">&#8250;</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
