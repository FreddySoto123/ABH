import { useEffect, useRef, useState } from 'react'
import { SVG } from '@svgdotjs/svg.js'
import './FloorMap.css'

const COLORS = {
    primary: '#1a365d',
    secondary: '#2c3e50',
    gray: '#7c7c7c',
    cream: '#f4f1e8',
    white: '#ffffff',
    accent: '#d9ab2c',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    room1: '#E17055',
    room2: '#6C7B95',
    room3: '#81B29A',
    room4: '#A8C8E1'
}

const drawIsometricRoom = (draw, x, y, width, height, depth, color, number, label) => {
    const group = draw.group()

    const topPoints = [
        [x, y],
        [x + width, y],
        [x + width + depth, y - depth],
        [x + depth, y - depth]
    ]

    group.polygon(topPoints.map(p => p.join(',')).join(' '))
        .fill(color)
        .stroke({ width: 2, color: COLORS.secondary })
        .addClass('room-top')

    group.rect(width, height)
        .move(x, y)
        .fill(color)
        .stroke({ width: 2, color: COLORS.secondary })
        .addClass('room-front')

    const rightPoints = [
        [x + width, y],
        [x + width + depth, y - depth],
        [x + width + depth, y - depth + height],
        [x + width, y + height]
    ]

    group.polygon(rightPoints.map(p => p.join(',')).join(' '))
        .fill(color)
        .stroke({ width: 2, color: COLORS.secondary })
        .addClass('room-side')

    group.text(number)
        .move(x + width / 2 - 15, y + height / 2 - 15)
        .fill(COLORS.white)
        .font({ size: 20, weight: 'bold', family: 'Arial' })
        .addClass('room-number')

    if (label) {
        group.text(label)
            .move(x + width / 2 - (label.length * 3), y + height / 2 + 5)
            .fill(COLORS.white)
            .font({ size: 10, weight: 'normal', family: 'Arial' })
            .addClass('room-label')
    }

    group.addClass('room-element interactive')

    group.click(() => {
        console.log(`${label || 'Habitación'} ${number} clicked`)
    })

    return group
}

const drawMezanine = (draw) => {
    const offsetX = 80
    const offsetY = 120
    const roomDepth = 25

    const rooms = [
        { x: offsetX, y: offsetY + 280, width: 120, height: 80, color: COLORS.room1, number: '01', label: 'DEPOSITO TIENDA 1' },
        { x: offsetX + 120, y: offsetY + 280, width: 60, height: 40, color: COLORS.room2, number: '02', label: 'BAÑO' },
        { x: offsetX + 180, y: offsetY + 280, width: 60, height: 40, color: COLORS.room2, number: '03', label: 'BAÑO' },
        { x: offsetX + 120, y: offsetY + 320, width: 120, height: 80, color: COLORS.room3, number: '04', label: 'ESCALERAS' },
        { x: offsetX, y: offsetY + 180, width: 80, height: 100, color: COLORS.room4, number: '05', label: 'HABITACIÓN 2' },
        { x: offsetX, y: offsetY + 80, width: 120, height: 100, color: COLORS.room1, number: '06', label: 'SALA DE PROYECCIÓN' },
        { x: offsetX + 240, y: offsetY + 180, width: 300, height: 220, color: COLORS.room3, number: '07', label: 'MEZANINE TIENDA 2' },
        { x: offsetX + 540, y: offsetY + 180, width: 80, height: 220, color: COLORS.room2, number: '08', label: 'ESCALERAS' },
        { x: offsetX + 540, y: offsetY + 80, width: 80, height: 100, color: COLORS.room4, number: '09', label: 'HOTEL MADRID' },
        { x: offsetX + 120, y: offsetY, width: 420, height: 80, color: COLORS.room1, number: '10', label: 'VECINO CASA AGRAMONT' }
    ]

    rooms.forEach(room => {
        drawIsometricRoom(draw, room.x, room.y, room.width, room.height, roomDepth, room.color, room.number, room.label)
    })

    const entranceGroup = draw.group()
    entranceGroup.rect(80, 20)
        .move(offsetX + 320, offsetY + 400)
        .fill(COLORS.secondary)
        .stroke({ width: 2, color: COLORS.secondary })

    entranceGroup.text('ENTRADA PRINCIPAL')
        .move(offsetX + 325, offsetY + 405)
        .fill(COLORS.white)
        .font({ size: 12, weight: 'bold', family: 'Arial' })
}

const drawCubiertas = (draw) => {
    const offsetX = 80
    const offsetY = 120
    const roomDepth = 25

    const rooms = [
        { x: offsetX, y: offsetY + 200, width: 150, height: 120, color: COLORS.room1, number: '01', label: 'CUBIERTA LAMINA ONDULADA' },
        { x: offsetX + 150, y: offsetY + 200, width: 150, height: 120, color: COLORS.room1, number: '02', label: 'CUBIERTA LAMINA ONDULADA' },
        { x: offsetX + 300, y: offsetY + 200, width: 200, height: 120, color: COLORS.room3, number: '03', label: 'CUBIERTA POLICARBONATO' },
        { x: offsetX + 500, y: offsetY + 200, width: 120, height: 120, color: COLORS.room2, number: '04', label: 'VECINO' },
        { x: offsetX + 300, y: offsetY + 80, width: 200, height: 120, color: COLORS.room4, number: '05', label: 'CUBIERTA POLICARBONATO' },
        { x: offsetX + 500, y: offsetY + 80, width: 120, height: 120, color: COLORS.room2, number: '06', label: 'VECINO' }
    ]

    rooms.forEach(room => {
        drawIsometricRoom(draw, room.x, room.y, room.width, room.height, roomDepth, room.color, room.number, room.label)
    })
}

const FloorMap = () => {
    const svgRef = useRef(null)
    const [currentFloor, setCurrentFloor] = useState('Mezanine')
    const [floors] = useState(['Mezanine', 'Cubiertas'])
    const [currentFloorIndex, setCurrentFloorIndex] = useState(0)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1)
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
    const [isPanning, setIsPanning] = useState(false)
    const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 })

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const selectFloor = (index) => {
        setCurrentFloorIndex(index)
        setCurrentFloor(floors[index])
        setDropdownOpen(false)
    }

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.2, 3))
    }

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.2, 0.5))
    }

    const handleResetZoom = () => {
        setZoomLevel(1)
        setPanOffset({ x: 0, y: 0 })
    }

    const handleMouseDown = (e) => {
        if (e.button === 0) {
            setIsPanning(true)
            setLastPanPoint({ x: e.clientX, y: e.clientY })
        }
    }

    const handleMouseMove = (e) => {
        if (isPanning) {
            const deltaX = e.clientX - lastPanPoint.x
            const deltaY = e.clientY - lastPanPoint.y
            setPanOffset(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }))
            setLastPanPoint({ x: e.clientX, y: e.clientY })
        }
    }

    const handleMouseUp = () => {
        setIsPanning(false)
    }

    const handleWheel = (e) => {
        e.preventDefault()
        const delta = e.deltaY > 0 ? -0.1 : 0.1
        setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)))
    }

    useEffect(() => {
        if (svgRef.current) {
            svgRef.current.innerHTML = ''

            const draw = SVG().addTo(svgRef.current).size('100%', '700px')

            const mainGroup = draw.group()

            if (currentFloor === 'Mezanine') {
                drawMezanine(mainGroup)
            } else {
                drawCubiertas(mainGroup)
            }

            mainGroup.transform({
                scale: zoomLevel,
                translateX: panOffset.x,
                translateY: panOffset.y
            })
        }
    }, [currentFloor, zoomLevel, panOffset])

    return (
        <div className="floormap-container">
            <header className="floormap-header">
                <h2 className="floormap-title">Academia de Historia Militar</h2>
                <div className="floor-selector">
                    <div
                        className={`floor-selector-dropdown ${dropdownOpen ? 'open' : ''}`}
                        onClick={toggleDropdown}
                    >
                        {currentFloor}
                    </div>
                    <div className={`floor-selector-options ${dropdownOpen ? 'open' : ''}`}>
                        {floors.map((floor, index) => (
                            <div
                                key={index}
                                onClick={() => selectFloor(index)}
                                className={`floor-selector-option ${index === currentFloorIndex ? 'selected' : ''}`}
                            >
                                {floor}
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            <div className="floormap-wrapper">
                <div
                    ref={svgRef}
                    className="floormap-svg-container"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onWheel={handleWheel}
                    style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
                ></div>
                <div className="zoom-controls">
                    <button
                        className="zoom-button"
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 3}
                        title={`Zoom In (${Math.round(zoomLevel * 100)}%)`}
                    >
                        +
                    </button>
                    <button
                        className="zoom-button"
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 0.5}
                        title={`Zoom Out (${Math.round(zoomLevel * 100)}%)`}
                    >
                        -
                    </button>
                    <button
                        className="zoom-button"
                        onClick={handleResetZoom}
                        disabled={zoomLevel === 1 && panOffset.x === 0 && panOffset.y === 0}
                        title="Reset Zoom and Pan"
                        style={{ fontSize: '12px' }}
                    >
                        ⌂
                    </button>
                </div>
                <div className="zoom-indicator">
                    {Math.round(zoomLevel * 100)}%
                </div>
            </div>

            <div className="floormap-info">
                <p>Selecciona un nivel para visualizar las habitaciones de la academia.</p>
            </div>
        </div>
    )
}

export default FloorMap