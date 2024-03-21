import { PropsWithChildren } from "react";

export function Grid({ children, h }: PropsWithChildren<{ h?: number }>) {
    return (
        <div className="h-full" style={{
            display: "grid",
            gridTemplateColumns: "1fr 4fr 2fr",
            gridTemplateRows: "10% 80% 10%",
            gridTemplateAreas: `'top top top' 'tree center class' 'bottom bottom bottom'`,
            gap: "20px",
        }}>
            {children}
        </div>
    )
}