//
//  CounterViewManager.swift
//  Counter
//
//  Created by Jiweon Park on 2024-02-16.
//

@objc(CounterViewManager)
class CounterViewManager: RCTViewManager {
  override func view() -> UIView! {
      return CounterView()
    }
  
  override static func requiresMainQueueSetup() -> Bool {
      return true
    }
  
  @objc func updateFromManager(_ node: NSNumber, count: NSNumber) {
    
    DispatchQueue.main.async {                                // 2
      let component = self.bridge.uiManager.view(             // 3
        forReactTag: node                                     // 4
      ) as! CounterView                                       // 5
      component.update(value: count)                          // 6
    }
  }
  
}
