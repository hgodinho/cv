import React from "react";

export function Fields({ data }: { data: Record<string, any> }) {
    console.log("Fields", { data });
    const exclude = [
        "id",
        "index",
        "x",
        "y",
        "z",
        "vx",
        "vy",
        "vz",
        "color",
        "group",
        "__threeObj",
    ];

    return (
        <>
            {Object.entries(data).map(([key, value]) => {
                if (exclude.includes(key)) return null;

                if (key.startsWith("http")) {
                    const name = key.split("/").pop();
                    if ("name" === name) {
                        return (
                            <Field
                                key={key}
                                label={name}
                                value={value[0]["@value"]}
                                url={key}
                                header={true}
                            />
                        );
                    }
                }

                if (["@id", "@type"].includes(key)) {
                    return (
                        <Field key={key} label={key} value={value} />
                    );
                }

                return (
                    <Field
                        key={key}
                        label={key}
                        value={value[0]["@value"]}
                        url={key}
                    />
                );
            })}
        </>
    );
}

export function Field({
    label,
    value,
    url,
    header,
}: {
    label: string;
    value: string;
    url?: string;
    header?: boolean;
}) {
    return (
        <div className="field mb-4">
            <p className="text-sm text-gray-300">
                {url ? <a href={url}>{label}</a> : label}
            </p>
            {header ? <h2 className="text-lg">{value}</h2> : <p>{value}</p>}
        </div>
    );
}
