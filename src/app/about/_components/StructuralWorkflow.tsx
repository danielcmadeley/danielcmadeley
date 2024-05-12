import Image from "next/image";

const StructuralWorkflow = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-6 bg-zinc-900 p-6 rounded-xl">
      <h2 className="text-xl uppercase font-display">
        Structural Engineering Workflow
      </h2>
      <div className="flex flex-col gap-2">
        <h3 className="uppercase font-display">Design</h3>
        <div>
          <h4 className="text-xs uppercase font-display text-zinc-400">
            Calculations
          </h4>
          <div className="flex flex-row gap-4 text-sm">
            <div className="flex flex-row gap-2">
              <Image
                src="/react.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>CalcTree</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="/next-js.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>Python</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="/next-js.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>Hand Calcs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="uppercase font-display">Analysis</h3>
        <div>
          <h4 className="text-xs uppercase font-display text-zinc-400">FEA</h4>
          <div className="flex flex-row gap-4 text-sm">
            <div className="flex flex-row gap-2">
              <Image
                src="/react.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>Tekla Structural Designer</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="/next-js.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>Grasshopper</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="/next-js.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>Rhino</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-xs uppercase font-display text-zinc-400">
            Calculations
          </h4>
          <div className="flex flex-row gap-4 text-sm">
            <div className="flex flex-row gap-2">
              <Image
                src="/react.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>Tedds</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image
                src="/next-js.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>Python</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="uppercase font-display">Detailing</h3>
        <div>
          <h4 className="text-xs uppercase font-display text-zinc-400">
            Markups
          </h4>
          <div className="flex flex-row gap-4 text-sm">
            <div className="flex flex-row gap-2">
              <Image
                src="/react.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>Bluebeam</p>
            </div>

            <div className="flex flex-row gap-2">
              <Image
                src="/next-js.svg"
                alt="React"
                width={16}
                height={16}
                className="rounded-md"
              />

              <p>Hand Sketches</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructuralWorkflow;
