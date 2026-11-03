declare module "maplibre-gl" {
  const maplibregl: {
    Map: {
      new (args: unknown): { addControl: (control: unknown, placement?: string) => void; remove: () => void },
      prototype: { addControl: (control: unknown, placement?: string) => void; remove: () => void },
    },
    AttributionControl: new (args?: unknown) => unknown,
    NavigationControl: new (args?: unknown) => unknown,
    StyleSpecification: object,
  };
  export default maplibregl;
}

