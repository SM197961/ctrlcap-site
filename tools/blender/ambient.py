"""CtrlCap ambient loop — glass slabs drifting through amber and cyan light.
Run:  blender -b --python ambient.py -- still 40 | anim
Renders to $OUT (env) as PNG frames. 24 fps, 192 frames = seamless 8 s loop:
every motion is a whole number of sine cycles over the loop.
"""
import bpy, math, os, sys, random

args = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else ['still', '40']
mode = args[0]
still_frame = int(args[1]) if len(args) > 1 else 40
OUT = os.environ.get('OUT', '/tmp/ambient')
os.makedirs(OUT, exist_ok=True)
random.seed(7)

FPS, FRAMES = 24, 192
TAU = math.pi * 2

# ── clean scene ──────────────────────────────────────────────
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.fps = FPS
scene.frame_start, scene.frame_end = 1, FRAMES
scene.render.resolution_x, scene.render.resolution_y = 1920, 1080
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.render.image_settings.color_mode = 'RGB'
scene.render.film_transparent = False

# engine: Cycles on the GPU (Metal), denoised
scene.render.engine = 'CYCLES'
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'
    prefs.get_devices()
    for d in prefs.devices: d.use = True
    scene.cycles.device = 'GPU'
    print('CYCLES DEVICES:', [(d.name, d.type, d.use) for d in prefs.devices])
except Exception as ex:
    print('GPU setup skipped:', ex)
scene.cycles.samples = int(os.environ.get('SAMPLES', '96'))
scene.cycles.use_denoising = True
scene.cycles.max_bounces = 8
scene.cycles.transmission_bounces = 8
scene.cycles.transparent_max_bounces = 8
scene.cycles.volume_bounces = 1
scene.cycles.volume_step_rate = 2.0
scene.render.resolution_percentage = int(os.environ.get('PCT', '100'))
try:
    scene.view_settings.view_transform = 'AgX'
    scene.view_settings.look = 'AgX - Medium High Contrast'
except Exception:
    pass

# ── world: deep navy with a whisper of fog ───────────────────
world = bpy.data.worlds.new('W'); scene.world = world
world.use_nodes = True
wn = world.node_tree.nodes; wl = world.node_tree.links
bg = wn['Background']
bg.inputs['Color'].default_value = (0.005, 0.009, 0.026, 1)
bg.inputs['Strength'].default_value = 1.0
vol = wn.new('ShaderNodeVolumePrincipled')
vol.inputs['Density'].default_value = 0.010
vol.inputs['Anisotropy'].default_value = 0.4
if not os.environ.get('NOVOL'): wl.new(vol.outputs['Volume'], wn['World Output'].inputs['Volume'])

# ── camera ───────────────────────────────────────────────────
cam_data = bpy.data.cameras.new('Cam'); cam_data.lens = 42
cam_data.dof.use_dof = True; cam_data.dof.focus_distance = 11.5; cam_data.dof.aperture_fstop = 2.0
cam = bpy.data.objects.new('Cam', cam_data); scene.collection.objects.link(cam)
cam.location = (0, -12.5, 0.2); cam.rotation_euler = (math.radians(90), 0, 0)
scene.camera = cam

# ── materials ────────────────────────────────────────────────
def glass_mat(tint):
    m = bpy.data.materials.new('Glass'); m.use_nodes = True
    p = m.node_tree.nodes['Principled BSDF']
    p.inputs['Base Color'].default_value = (*tint, 1)
    p.inputs['Roughness'].default_value = 0.06
    p.inputs['IOR'].default_value = 1.45
    for key in ('Transmission Weight', 'Transmission'):
        if key in p.inputs: p.inputs[key].default_value = 1.0; break
    if 'Alpha' in p.inputs: p.inputs['Alpha'].default_value = 1.0
    for attr, val in (('surface_render_method', 'DITHERED'), ('use_raytrace_refraction', True), ('use_screen_refraction', True), ('use_transparent_shadow', True)):
        if hasattr(m, attr):
            try: setattr(m, attr, val)
            except Exception: pass
    return m

def emit_mat(color, strength):
    m = bpy.data.materials.new('Emit'); m.use_nodes = True
    n = m.node_tree.nodes; l = m.node_tree.links
    for node in list(n):
        if node.type != 'OUTPUT_MATERIAL': n.remove(node)
    e = n.new('ShaderNodeEmission'); e.inputs['Color'].default_value = (*color, 1); e.inputs['Strength'].default_value = strength
    l.new(e.outputs['Emission'], n['Material Output'].inputs['Surface'])
    return m

glass_cool = glass_mat((0.78, 0.92, 1.0))
glass_warm = glass_mat((1.0, 0.92, 0.80))
amber = (1.0, 0.62, 0.12); cyan = (0.37, 0.82, 1.0)

# ── slabs ────────────────────────────────────────────────────
slabs = []
def add_slab(i, loc, rot, size, mat):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    o = bpy.context.active_object; o.name = f'Slab{i}'
    o.scale = size; o.rotation_euler = rot
    bev = o.modifiers.new('Bevel', 'BEVEL'); bev.width = 0.06; bev.segments = 6
    o.data.materials.append(mat)
    for poly in o.data.polygons: poly.use_smooth = True
    return o

layout = [
    ((-5.2, 3.5,  1.6), (0.12, 0.25, 0.10), (3.4, 0.22, 2.0)),
    (( 4.8, 4.2, -1.2), (-0.10, -0.30, 0.18), (3.8, 0.22, 2.2)),
    (( 0.6, 7.5,  2.6), (0.20, 0.15, -0.25), (4.6, 0.24, 2.6)),
    ((-2.4, 6.0, -2.4), (-0.22, 0.10, 0.30), (3.0, 0.20, 1.8)),
    (( 7.4, 8.5,  0.8), (0.15, -0.35, 0.05), (4.0, 0.22, 2.4)),
    ((-7.6, 9.0, -0.6), (0.05, 0.40, -0.12), (3.6, 0.22, 2.2)),
    (( 2.8, 2.6, -3.2), (-0.30, 0.05, 0.22), (2.4, 0.18, 1.4)),
    ((-0.8, 11.0, 3.4), (0.28, -0.12, 0.35), (5.0, 0.26, 3.0)),
    (( 5.6, 12.0, -3.0), (-0.18, 0.22, -0.28), (4.2, 0.22, 2.4)),
]
for i, (loc, rot, size) in enumerate(layout):
    o = add_slab(i, loc, rot, size, glass_warm if i % 3 == 1 else glass_cool)
    o['phase'] = random.random() * TAU
    o['cycles'] = random.choice([1, 1, 2])
    o['amp'] = 0.35 + random.random() * 0.5
    o['spin'] = (random.random() - 0.5) * 0.18
    slabs.append(o)

# ── amber light bars (thin emissive strips) ─────────────────
bars = []
for i, (loc, rot, length) in enumerate([
    ((-3.0, 5.2, -1.9), (0, 0, 0.35), 5.5),
    (( 6.2, 6.6,  2.2), (0, 0, -0.6), 4.0),
    (( 1.5, 9.4, -0.4), (0, 0, 0.15), 7.0),
]):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc)
    b = bpy.context.active_object; b.name = f'Bar{i}'
    b.scale = (length, 0.05, 0.05); b.rotation_euler = rot
    b.data.materials.append(emit_mat(amber if i != 1 else cyan, 14))
    b['phase'] = random.random() * TAU
    bars.append(b)

# ── dust: small emissive spheres ────────────────────────────
dust = []
for i in range(46):
    loc = (random.uniform(-9, 9), random.uniform(1.5, 12), random.uniform(-4.5, 4.5))
    bpy.ops.mesh.primitive_uv_sphere_add(radius=random.uniform(0.012, 0.03), location=loc, segments=10, ring_count=6)
    d = bpy.context.active_object; d.name = f'Dust{i}'
    d.data.materials.append(emit_mat((0.8, 0.9, 1.0) if i % 4 else amber, random.uniform(3, 9)))
    d['phase'] = random.random() * TAU
    d['amp'] = random.uniform(0.15, 0.5)
    dust.append(d)

# ── lights ───────────────────────────────────────────────────
def area(name, loc, rot, color, energy, size):
    L = bpy.data.lights.new(name, 'AREA'); L.color = color; L.energy = energy; L.size = size
    o = bpy.data.objects.new(name, L); scene.collection.objects.link(o)
    o.location = loc; o.rotation_euler = rot
    return o
key = area('Amber', (7, 2, -4), (math.radians(60), 0, math.radians(35)), amber, 1700, 5)
fill = area('Cyan', (-8, 4, 5), (math.radians(-120), 0, math.radians(-40)), cyan, 5200, 7)
rim = area('Rim', (0, 14, 6), (math.radians(150), 0, 0), (0.8, 0.92, 1.0), 1800, 10)

# ── animation: everything periodic over FRAMES ───────────────
def keyframe_all():
    for f in range(1, FRAMES + 1):
        t = (f - 1) / FRAMES
        scene.frame_set(f)
        for i, o in enumerate(slabs):
            loc, rot, _ = layout[i]
            c = o['cycles']; ph = o['phase']; a = o['amp']
            o.location = (loc[0] + math.cos(TAU * c * t + ph) * a * 0.6, loc[1], loc[2] + math.sin(TAU * c * t + ph) * a)
            o.rotation_euler = (rot[0] + math.sin(TAU * t + ph) * o['spin'], rot[1] + math.cos(TAU * t + ph * 0.7) * o['spin'] * 0.6, rot[2])
            o.keyframe_insert('location'); o.keyframe_insert('rotation_euler')
        for b in bars:
            b.location.z = b.location.z + 0  # static position
            s = 10 + 6 * math.sin(TAU * 2 * t + b['phase'])
            e = b.data.materials[0].node_tree.nodes['Emission'].inputs['Strength']
            e.default_value = s; e.keyframe_insert('default_value')
        for d in dust:
            base = d.get('base') or tuple(d.location)
            if 'base' not in d: d['base'] = base
            ph = d['phase']; a = d['amp']
            d.location = (base[0] + math.cos(TAU * t + ph) * a, base[1], base[2] + math.sin(TAU * t + ph) * a * 1.4)
            d.keyframe_insert('location')
        # slow camera breathe
        cam.location = (math.sin(TAU * t) * 0.35, -12.5, 0.2 + math.cos(TAU * t) * 0.2)
        cam.keyframe_insert('location')
keyframe_all()

# Keys on every frame already make the loop seamless; interpolation doesn't matter.
# (Blender 5 layered actions changed the fcurve API, so we don't touch it.)

# ── compositor glare (bloom) ────────────────────────────────
try:
    scene.use_nodes = True
    nt = scene.node_tree
    for n in list(nt.nodes): nt.nodes.remove(n)
    rl = nt.nodes.new('CompositorNodeRLayers'); comp = nt.nodes.new('CompositorNodeComposite')
    glare = nt.nodes.new('CompositorNodeGlare')
    glare.glare_type = 'BLOOM'
    for attr, val in (('threshold', 0.9), ('mix', 0.0), ('size', 7), ('quality', 'MEDIUM')):
        if hasattr(glare, attr):
            try: setattr(glare, attr, val)
            except Exception: pass
    nt.links.new(rl.outputs['Image'], glare.inputs['Image'])
    nt.links.new(glare.outputs['Image'], comp.inputs['Image'])
except Exception as ex:
    print('glare skipped:', ex)

# ── render ───────────────────────────────────────────────────
if mode == 'still':
    scene.frame_set(still_frame)
    scene.render.filepath = os.path.join(OUT, f'still_{still_frame:03d}.png')
    bpy.ops.render.render(write_still=True)
    print('STILL', scene.render.filepath)
else:
    scene.render.filepath = os.path.join(OUT, 'frame_')
    bpy.ops.render.render(animation=True)
    print('ANIM done', OUT)
