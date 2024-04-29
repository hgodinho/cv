import { tw } from "#root/lib";
import { Loader } from "react-feather";
import { motion } from "framer-motion";

export function Loading() {
    return (
        <div className={tw("self-center", "justify-self-center")}>
            <motion.div
                animate={{
                    rotate: 90,
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                <Loader size={32} />
            </motion.div>
        </div>
    );
}
