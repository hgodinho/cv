import { ClassView, OptionsView, Debug } from "#root/components";

export function Page() {
    return (
        <>
            <OptionsView />
            <ClassView />
            <Debug debug={false} />
        </>
    );
}
