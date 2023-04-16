import websocket
import rel
import time
import threading

# url of WebSocket server
url = "ws://192.168.0.13:3000"

def on_message(ws, message):
	msg_parts = message.split(':')    
	if msg_parts[0] == "waterPlant":
		print("i'm gonna water the shit out of this plant")
	elif msg_parts[0] == 'wateringMethodChange':
		print(f"Change watering method to {msg_parts[1]}")
	elif msg_parts[0] == 'alertLevelsChange':
		print(f"Change alert levels")
		alertLevels = {'tempLower':msg_parts[1].split('_')[0],
						'tempUpper':msg_parts[1].split('_')[1],
						'humidityLower': msg_parts[2].split('_')[0],
						'humidityUpper': msg_parts[2].split('_')[1],
						'soilMoistureSetpoint': msg_parts[3],
						'sunlightTime': msg_parts[4]}
		print(alertLevels)
		
	ws.send('Message receipt acknowledged')
	plantStatus = "FUCKED UP"
	ws.send(f"plantStatus:{plantStatus}")
	
def on_error(ws, error):
	print(error)
	
def on_close(ws, close_status_code, close_msg):
	print("Connection closed")
	
def on_open(ws):
	print("Opened connection")

def connect_websocket():
	# Start WebSocket connection
	websocket.enableTrace(True)
	ws = websocket.WebSocketApp(url,
							on_open=on_open, 
							on_message=on_message,
							on_error=on_error,
							on_close=on_close)
	wst = threading.Thread(target=ws.run_forever)
	wst.daemon = True
	wst.start()

	return ws

if __name__=="__main__":
	try:
		ws = connect_websocket()
	except Exception as e:
		print(e)

	while True:
		print('other shit')
