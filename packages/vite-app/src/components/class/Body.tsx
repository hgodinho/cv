import { Scroll, Field } from "@/components";
import { type FilterValue } from "@/provider";
import { tw } from "@/lib";
import { useFilterContext } from "@/provider";

export function Description() {
    const {
        selected,
        data: { properties },
    } = useFilterContext();

    return selected ? (
        <section className={tw("px-4", "pt-2", "flex", "flex-col")}>
            <h2
                className={tw(
                    "sticky",
                    "top-0",
                    "text-2xl",
                    "font-medium",
                    "italic",
                    "bg-black/90",
                    "pb-2",
                    "mb-2"
                )}
            >
                Descrição
            </h2>
            {properties.map((property) => {
                const value = selected[property];
                if (
                    selected.hasOwnProperty(property) &&
                    typeof value !== "undefined"
                ) {
                    if ("name" === property) {
                        return null;
                    }
                    return (
                        <Field
                            key={property}
                            label={{
                                value: property,
                                url: `${selected["@context"]}/${property}`,
                            }}
                            value={value}
                        />
                    );
                }
            })}
        </section>
    ) : null;
}

export function Connections() {}

export type BodyProps = {
    colors: Record<string, string>;
} & DescriptionProps;

export function Body({ data, properties, filterValue }: BodyProps) {
    return (
        <div className={tw("overflow-auto", "flex", "flex-col", "bg-black/45")}>
            <Scroll root={{ className: tw("mr-2", "mt-2", "mb-2") }}>
                <Description />
                <Connections />
            </Scroll>
        </div>
    );
}
