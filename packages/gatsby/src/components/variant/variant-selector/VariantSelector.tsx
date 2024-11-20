import { Heading } from "#root/components";
import { tw } from "#root/lib";
import { useI18nContext, usePageContext } from "#root/provider";
import { Link } from "gatsby";
import { FileText, Waypoints, LucideProps } from "lucide-react";
import React, { HTMLAttributes, useMemo } from "react";

export type ListProps = {} & HTMLAttributes<HTMLUListElement>;

export type ListItemProps = {
    Icon: React.ComponentType<LucideProps>;
    title: string;
    description: string;
    link: string;
} & HTMLAttributes<HTMLLIElement>;

export function List({ children, className, ...props }: ListProps) {
    return (
        <ul
            className={tw(
                "flex",
                "flex-col",
                "gap-4",
                "items-start",
                "justify-center",
                className
            )}
            {...props}
        >
            {children}
        </ul>
    );
}

export function ListItem({
    children,
    title,
    description,
    link,
    Icon,
    className,
    ...props
}: ListItemProps) {
    return (
        <li className={tw(className)} {...props}>
            <Link
                to={link}
                className={tw(
                    "flex",
                    "flex-row",
                    "items-center",
                    "justify-center",
                    "bg-zinc-900",
                    "group",
                    "hover:bg-zinc-800"
                )}
            >
                <span className={tw("m-6")}>
                    <Icon size={52} strokeWidth={1} />
                </span>
                <div
                    className={tw(
                        "bg-zinc-800",
                        "group-hover:bg-zinc-700",
                        "p-6"
                    )}
                >
                    <Heading level={3}>{title}</Heading>
                    <p>{description}</p>
                </div>
            </Link>
        </li>
    );
}

export function VariantSelector() {
    const { locale } = useI18nContext();
    const { pageContext } = usePageContext();

    const { node, text, title } = useMemo(() => {
        const locales = {
            pt_br: {
                node: {
                    title: "nós",
                    description: "visualizar os dados em gráfico de força",
                },
                text: {
                    title: "texto",
                    description:
                        "visualizar no formato convencional de currículo",
                },
                title: "Selecionar visualização",
            },
            en: {
                node: {
                    title: "nodes",
                    description: "visualize data in force-graph field",
                },
                text: {
                    title: "text",
                    description:
                        "visualize data in common curriculum-vitae view",
                },
                title: "Select view",
            },
            es: {
                node: {
                    title: "nodos",
                    description: "visualizar los datos en gráfico de fuerza",
                },
                text: {
                    title: "texto",
                    description:
                        "visualizar en el formato convencional de currículum",
                },
                title: "Seleccionar vista",
            },
        };
        return locales[locale];
    }, [locale]);

    return (
        <>
            <Heading level={2}>{title}</Heading>
            <List>
                <ListItem
                    Icon={Waypoints}
                    title={node.title}
                    description={node.description}
                    link={`/${locale}/`}
                />
                <ListItem
                    Icon={FileText}
                    title={text.title}
                    description={text.description}
                    link={`/${locale}/${pageContext?.site.textSlug ?? "text"}`}
                />
            </List>
        </>
    );
}
