import { Scroll, Field } from "@/components";
import { type FilterValue } from "@/provider";
import { tw } from "@/lib";

export type DescriptionProps = {
    data: Record<string, any>;
    properties: string[];
    filterValue?: FilterValue["filterValue"];
};

export function Description({
    properties,
    data,
    filterValue,
}: DescriptionProps) {
    return (
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
                const value = data[property];
                if (
                    data.hasOwnProperty(property) &&
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
                                url: `${data["@context"]}/${property}`,
                            }}
                            value={value}
                            filterValue={filterValue}
                        />
                    );
                }
            })}
        </section>
    );
}

export function Connections() {}

export type BodyProps = {
    colors: Record<string, string>;
} & DescriptionProps;

export function Body({ data, properties, filterValue }: BodyProps) {
    return (
        <div className={tw("overflow-auto", "flex", "flex-col", "bg-black/45")}>
            <Scroll root={{ className: tw("mr-2", "mt-2", "mb-2") }}>
                <Description
                    data={data}
                    properties={properties}
                    filterValue={filterValue}
                />
            </Scroll>
        </div>
    );
}
