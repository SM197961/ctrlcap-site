"""CtrlCap device shot — a glass-framed display floating in the dark,
showing the dashboard screenshot, lit amber/cyan. Cycles, one still.
Run: SHOT=/path/to/screenshot.png OUT=/dir blender -b --python device.py
"""
import bpy, math, os

SHOT = os.environ['SHOT']
OUT = os.environ.get('OUT', '/tmp/device'); os.makedirs(OUT, exist_ok=True)
W, H = 2000, 1250

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'CYCLES'
try:
    prefs = bpy.context.preferences.addons['cycles'].preferences
    prefs.compute_device_type = 'METAL'; prefs.get_devices()
    for d in prefs.devices: d.use = True
    scene.cycles.device = 'GPU'
except Exception as ex: print('gpu skipped', ex)
scene.cycles.samples = 160; scene.cycles.use_denoising = True
scene.render.resolution_x, scene.render.resolution_y = W, H
scene.render.film_transparent = True
scene.render.image_settings.file_format = 'PNG'; scene.render.image_settings.color_mode = 'RGBA'
try:
    scene.view_settings.view_transform = 'AgX'; scene.view_settings.look = 'AgX - Medium High Contrast'
except Exception: pass

world = bpy.data.worlds.new('W'); scene.world = world; world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.02, 0.03, 0.06, 1)
world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.6

# camera
cam_data = bpy.data.cameras.new('Cam'); cam_data.lens = 62
cam_data.dof.use_dof = True; cam_data.dof.focus_distance = 9.2; cam_data.dof.aperture_fstop = 4.0
cam = bpy.data.objects.new('Cam', cam_data); scene.collection.objects.link(cam)
cam.location = (2.6, -8.2, 1.4); cam.rotation_euler = (math.radians(82), 0, math.radians(17))
scene.camera = cam

# screen: plane with the screenshot as emission + a glass slab in front
img = bpy.data.images.load(SHOT)
aspect = img.size[0] / img.size[1]
sw, sh = 5.6, 5.6 / aspect

bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0))
screen = bpy.context.active_object; screen.name = 'Screen'
screen.scale = (sw / 2, sh / 2, 1); screen.rotation_euler = (math.radians(90), 0, 0)
m = bpy.data.materials.new('ScreenMat'); m.use_nodes = True
n = m.node_tree.nodes; l = m.node_tree.links
for node in list(n):
    if node.type != 'OUTPUT_MATERIAL': n.remove(node)
tex = n.new('ShaderNodeTexImage'); tex.image = img
em = n.new('ShaderNodeEmission'); em.inputs['Strength'].default_value = 1.6
l.new(tex.outputs['Color'], em.inputs['Color']); l.new(em.outputs['Emission'], n['Material Output'].inputs['Surface'])
screen.data.materials.append(m)

# bezel body behind the screen
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0.16, 0))
body = bpy.context.active_object; body.name = 'Body'
body.scale = (sw / 2 + 0.16, 0.14, sh / 2 + 0.16)
bev = body.modifiers.new('Bevel', 'BEVEL'); bev.width = 0.08; bev.segments = 6
bm = bpy.data.materials.new('BodyMat'); bm.use_nodes = True
pb = bm.node_tree.nodes['Principled BSDF']
pb.inputs['Base Color'].default_value = (0.05, 0.06, 0.09, 1); pb.inputs['Metallic'].default_value = 0.85; pb.inputs['Roughness'].default_value = 0.25
body.data.materials.append(bm)

# glass front
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -0.05, 0))
glass = bpy.context.active_object; glass.name = 'Glass'
glass.scale = (sw / 2 + 0.16, 0.05, sh / 2 + 0.16)
gb = glass.modifiers.new('Bevel', 'BEVEL'); gb.width = 0.04; gb.segments = 5
gm = bpy.data.materials.new('GlassMat'); gm.use_nodes = True
pg = gm.node_tree.nodes['Principled BSDF']
pg.inputs['Base Color'].default_value = (0.9, 0.96, 1, 1); pg.inputs['Roughness'].default_value = 0.04; pg.inputs['IOR'].default_value = 1.5
for key in ('Transmission Weight', 'Transmission'):
    if key in pg.inputs: pg.inputs[key].default_value = 1.0; break
glass.data.materials.append(gm)

# amber accent bar along the bottom edge
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -0.02, -(sh / 2 + 0.16) - 0.06))
bar = bpy.context.active_object; bar.scale = (sw / 2 + 0.16, 0.06, 0.03)
am = bpy.data.materials.new('Amber'); am.use_nodes = True
na = am.node_tree.nodes
for node in list(na):
    if node.type != 'OUTPUT_MATERIAL': na.remove(node)
e = na.new('ShaderNodeEmission'); e.inputs['Color'].default_value = (1.0, 0.62, 0.12, 1); e.inputs['Strength'].default_value = 12
am.node_tree.links.new(e.outputs['Emission'], na['Material Output'].inputs['Surface'])
bar.data.materials.append(am)

def area(name, loc, rot, color, energy, size):
    L = bpy.data.lights.new(name, 'AREA'); L.color = color; L.energy = energy; L.size = size
    o = bpy.data.objects.new(name, L); scene.collection.objects.link(o); o.location = loc; o.rotation_euler = rot
area('Amber', (6.5, -3, -1.5), (math.radians(82), 0, math.radians(62)), (1.0, 0.62, 0.12), 1500, 3)
area('Cyan', (-7, -4, 4.5), (math.radians(62), 0, math.radians(-58)), (0.37, 0.82, 1.0), 2200, 5)
area('Rim', (0, 6, 5), (math.radians(140), 0, 0), (0.8, 0.9, 1.0), 1200, 8)

# tilt the whole device as one object
rig = bpy.data.objects.new('Rig', None); scene.collection.objects.link(rig)
for o in (screen, body, glass, bar):
    o.parent = rig
rig.rotation_euler = (math.radians(-6), math.radians(4), math.radians(-14))
rig.location = (0.2, 0, 0.1)
scene.render.filepath = os.path.join(OUT, 'device.png')
bpy.ops.render.render(write_still=True)
print('DEVICE', scene.render.filepath)
