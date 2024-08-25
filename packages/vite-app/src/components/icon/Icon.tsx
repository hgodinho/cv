import { ClientOnly } from "vike-react/ClientOnly";
import { IconProps as PrimitiveIconProps } from "react-feather";

export type IconProps = {
    name: string;
} & PrimitiveIconProps;

export function Icon({ name, ...props }: IconProps) {
    return (
        <ClientOnly
            load={() =>
                import("react-feather")
                    .then(
                        (module) =>
                            module[
                            name
                            ] as React.ComponentType<PrimitiveIconProps>
                    )
                    .catch(() => {
                        throw new Error(`Icon ${name} not found`);
                    })
            }
            fallback={null}
            deps={[name, props]}
        >
            {(Icon) => {
                return <Icon {...props} />;
            }}
        </ClientOnly>
    );
}
